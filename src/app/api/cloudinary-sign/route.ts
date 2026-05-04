import { v2 as cloudinary } from "cloudinary"
import { NextResponse } from "next/server"

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { paramsToSign } = body

    // Ensure api_key is not part of the signature string
    const params = { ...paramsToSign }
    delete params.api_key

    const signature = cloudinary.utils.api_sign_request(
      params,
      process.env.CLOUDINARY_API_SECRET!
    )

    return NextResponse.json({ signature })
  } catch (error) {
    return NextResponse.json({ error: "Signature failed" }, { status: 500 })
  }
}
