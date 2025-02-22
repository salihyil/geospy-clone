import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const imageFile = formData.get("image") as File;

    if (!imageFile) {
      return NextResponse.json(
        { error: "Resim dosyası bulunamadı" },
        { status: 400 },
      );
    }

    // Dosya tipini kontrol et
    const validTypes = ["image/png", "image/jpeg", "image/gif", "image/webp"];
    if (!validTypes.includes(imageFile.type)) {
      return NextResponse.json(
        {
          error: `Desteklenmeyen dosya formatı: ${imageFile.type}. Desteklenen formatlar: PNG, JPEG, GIF, WEBP`,
        },
        { status: 400 },
      );
    }

    try {
      // Görüntü verilerini Buffer'a çevir
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Initialize Gemini API
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      // Convert buffer to base64 for Gemini
      const base64Image = buffer.toString("base64");
      const mimeType = imageFile.type;

      // Create image part for Gemini
      const imageParts = [
        {
          inlineData: {
            data: base64Image,
            mimeType: mimeType,
          },
        },
      ];

      // Generate content with Gemini
      const result = await model.generateContent([
        "Provide the country, confidence(%), latitude, longitude, state, and city information of the uploaded image if available.Let the output be in json format",
        ...imageParts,
      ]);
      const response = result.response;
      const description = response.text();
      console.log("Description:", description);

      // Assuming 'description' is the JSON string received
      const countryMatch = /"country":\s*"([^"]+)"/.exec(description);
      const confidenceMatch = /"confidence":\s*(\d+)/.exec(description);
      const latitudeMatch = /"latitude":\s*([\d.-]+)/.exec(description);
      const longitudeMatch = /"longitude":\s*([\d.-]+)/.exec(description);
      const stateMatch = /"state":\s*"([^"]+)"/.exec(description);
      const cityMatch = /"city":\s*"([^"]+)"/.exec(description);

      const extractedData = {
        country: countryMatch ? countryMatch[1] : "Bilinmiyor",
        confidence: confidenceMatch ? parseFloat(confidenceMatch[1]) : 0,
        latitude: latitudeMatch ? parseFloat(latitudeMatch[1]) : 0,
        longitude: longitudeMatch ? parseFloat(longitudeMatch[1]) : 0,
        state: stateMatch ? stateMatch[1] : "Bilinmiyor",
        city: cityMatch ? cityMatch[1] : "Bilinmiyor",
      };

      console.log("Extracted Data:", extractedData);

      // Use extracted data instead of making additional API calls
      return NextResponse.json({
        city: extractedData.city,
        state: extractedData.state,
        country: extractedData.country,
        latitude: extractedData.latitude,
        longitude: extractedData.longitude,
        confidence: extractedData.confidence,
        aiResponse: description,
        explanation: `AI Analiz Sonucu: ${description}`,
      });
    } catch (aiError: unknown) {
      console.error("AI/Konum tespiti hatası:", aiError);
      if (aiError instanceof Error) {
        console.error("Hata detayı:", aiError.stack);
      }
      throw new Error(
        `Gemini işlemi başarısız: ${aiError instanceof Error ? aiError.message : "Bilinmeyen hata"}`,
      );
    }
  } catch (error: unknown) {
    console.error("Genel hata:", error);
    if (error instanceof Error) {
      console.error("Hata stack:", error.stack);
    }
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Görüntüden konum tespit edilemedi";
    return NextResponse.json(
      {
        error: errorMessage,
        details: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 },
    );
  }
}
