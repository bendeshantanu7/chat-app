import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from "dotenv";
import fs from "fs";
dotenv.config();

const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

console.log("AWS Keys initialized:", !!accessKeyId, !!secretAccessKey)

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: accessKeyId || '',
        secretAccessKey: secretAccessKey || '',
    }
})


export const uploadProfilePicture = async (file: Express.Multer.File | undefined, userId: string) => {
    if (!file) {
        console.log("No file provided for upload");
        return null;
    }

    let fileBuffer: Buffer;
    if (file.buffer) {
        fileBuffer = file.buffer;
    } else if (file.path) {
        fileBuffer = fs.readFileSync(file.path);
    } else {
        throw new Error("File has neither buffer nor path");
    }

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `profile-pictures/${userId}-${Date.now()}-${file.originalname}`,
        Body: fileBuffer,
        ContentType: file.mimetype,
    }
    await s3.send(new PutObjectCommand(params))
    
    // Construct the public URL
    const region = process.env.AWS_REGION;
    const bucketName = process.env.AWS_BUCKET_NAME;
    const s3Url = `https://${bucketName}.s3.${region}.amazonaws.com/${params.Key}`;
    
    return s3Url;
}

const urlCache: Record<string, { url: string; expiresAt: number }> = {};
const CACHE_TTL_SECONDS = 3600;
const CACHE_MARGIN_MS = 300 * 1000; // 5 minutes margin

export const getPresignedUrl = async (key: string) => {
    const cached = urlCache[key];
    const now = Date.now();

    if (cached && cached.expiresAt > now + CACHE_MARGIN_MS) {
        return cached.url;
    }

    const command = new GetObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
    })
    
    const url = await getSignedUrl(s3, command, { expiresIn: CACHE_TTL_SECONDS });
    
    urlCache[key] = {
        url,
        expiresAt: now + (CACHE_TTL_SECONDS * 1000)
    };

    return url;
}

export default s3