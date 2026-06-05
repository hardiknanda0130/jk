'use client'
import * as faceapi from 'face-api.js'
import { useRef, useState, useEffect } from 'react'

export default function EnrollFace() {

  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const streamRef = useRef(null)

  const [image, setImage] = useState(null)   // ✅ single image
  const [stream, setStream] = useState(null)
  const [cameraOn, setCameraOn] = useState(false)
  const [modelsLoaded, setModelsLoaded] = useState(false)
  const [error, setError] = useState('')

  /* ================= LOAD MODELS ================= */

  useEffect(() => {

    const loadModels = async () => {
      try {

        await faceapi.nets.tinyFaceDetector.loadFromUri('/models')
        await faceapi.nets.faceLandmark68Net.loadFromUri('/models')

        setModelsLoaded(true)
        startCamera()

      } catch (err) {
        console.error(err)
        alert('Model loading failed. Check /public/models')
      }
    }

    loadModels()

    return () => {
      streamRef.current?.getTracks().forEach(t => t.stop())
    }

  }, [])


  /* ================= CAMERA ================= */

  const startCamera = async () => {

    const mediaStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'user' }
    })

    streamRef.current = mediaStream
    setStream(mediaStream)
    setCameraOn(true)
  }

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach(t => t.stop())
    setCameraOn(false)
  }

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream
    }
  }, [stream])


  /* ================= FACE STRAIGHT ================= */

  const isFaceStraight = (landmarks) => {

    const leftEye = landmarks.getLeftEye()
    const rightEye = landmarks.getRightEye()
    const nose = landmarks.getNose()

    const eyeDiff = Math.abs(leftEye[0].y - rightEye[3].y)

    const noseX = nose[3].x
    const eyeCenter = (leftEye[0].x + rightEye[3].x) / 2

    const noseOffset = Math.abs(noseX - eyeCenter)

    return eyeDiff < 10 && noseOffset < 20
  }


  /* ================= BACKGROUND VALIDATION ================= */

  const isBackgroundPlain = (canvas, faceBox) => {

  const ctx = canvas.getContext('2d', { willReadFrequently: true })

  const { x, y, width, height } = faceBox

  const margin = 80   // bigger area around face

  const bgX = Math.max(0, x - margin)
  const bgY = Math.max(0, y - margin)
  const bgW = Math.min(canvas.width - bgX, width + margin * 2)
  const bgH = Math.min(canvas.height - bgY, height + margin * 2)

  const img = ctx.getImageData(bgX, bgY, bgW, bgH).data

  let variance = 0
  let avg = 0
  let count = 0
  let edgeCount = 0

  for (let i = 0; i < img.length; i += 4) {

    const brightness = (img[i] + img[i + 1] + img[i + 2]) / 3

    avg += brightness
    count++

    if (i > 0) {
      const prev = (img[i - 4] + img[i - 3] + img[i - 2]) / 3

      if (Math.abs(brightness - prev) > 55) {
        edgeCount++
      }
    }
  }

  avg = avg / count

  for (let i = 0; i < img.length; i += 4) {
    const brightness = (img[i] + img[i + 1] + img[i + 2]) / 3
    variance += Math.pow(brightness - avg, 2)
  }

  variance = variance / count

  const edgeRatio = edgeCount / count

  /*
    NEW RELAXED CONDITIONS

    variance < 2500 → wall allowed
    edgeRatio < 0.22 → small objects allowed
  */

  const okColor = variance < 2500
  const okEdges = edgeRatio < 0.22

  return okColor && okEdges
}



  /* ================= CAPTURE ================= */

  const captureImage = async () => {

    if (!modelsLoaded) return

    const video = videoRef.current
    const canvas = canvasRef.current

    if (!video || !video.videoWidth) {
      alert('Camera not ready')
      return
    }

    const detections = await faceapi
      .detectAllFaces(
        video,
        new faceapi.TinyFaceDetectorOptions({
          inputSize: 320,
          scoreThreshold: 0.5
        })
      )
      .withFaceLandmarks()

    if (detections.length === 0) {
      setError('No face detected')
      return
    }

    if (detections.length > 1) {
      setError('Only one face allowed')
      return
    }

    const landmarks = detections[0].landmarks

    if (!isFaceStraight(landmarks)) {
      setError('Keep face straight')
      return
    }

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    ctx.drawImage(video, 0, 0)

    const faceBox = detections[0].detection.box

    if (!isBackgroundPlain(canvas, faceBox)) {
      setError('Background should be plain (no posters / objects)')
      return
    }

    setError('')

    const imgData = canvas.toDataURL('image/png')

    setImage(imgData)   // ✅ only one image

    stopCamera()
  }


  const retake = async () => {
    setImage(null)
    setError('')
    await startCamera()
  }


  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 p-8">

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* CAMERA */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center">

          <h1 className="text-2xl font-bold mb-4 text-blue-400">Face Capture</h1>

          {!modelsLoaded && (
            <p className="text-blue-600 animate-pulse">
              Loading Models...
            </p>
          )}

          <div className="w-full max-w-xl h-[320px] bg-black rounded-xl overflow-hidden">

            {cameraOn && (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
            )}

          </div>

          {error && (
            <p className="text-red-600 mt-3">{error}</p>
          )}

          <div className="flex gap-4 mt-6">

            {cameraOn && (
              <button
                onClick={captureImage}
                className="px-6 py-2 bg-green-600 text-white rounded-lg"
              >
                Capture
              </button>
            )}

            {!cameraOn && (
              <button
                onClick={retake}
                className="px-6 py-2 bg-gray-700 text-white rounded-lg"
              >
                Retake
              </button>
            )}

          </div>

        </div>


        {/* RIGHT SIDE IMAGE */}

        <div className="bg-white rounded-2xl shadow-xl p-6">

          <h2 className="text-lg font-semibold mb-4 text-blue-300">
            Captured Image
          </h2>

          {!image && (
            <p className="text-gray-400 text-sm">
              No image captured
            </p>
          )}

          {image && (
            <img
              src={image}
              alt="face"
              className="w-full rounded-lg border"
            />
          )}

        </div>

        <canvas ref={canvasRef} className="hidden" />

      </div>

    </div>
  )
}
