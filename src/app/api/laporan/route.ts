import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const nama = formData.get("nama") as string;
    const lokasi = formData.get("lokasi") as string;
    const deskripsi = formData.get("deskripsi") as string;
    const foto = formData.get("foto") as File;

    if (!nama || !lokasi || !deskripsi || !foto) {
      return NextResponse.json({
        success: false,
        message: "Data tidak lengkap"
      }, { status: 400 });
    }

    // ========================
    // SIMPAN FOTO
    // ========================
    const bytes = await foto.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = `${Date.now()}-${foto.name}`;
    const uploadPath = path.join(process.cwd(), "public/uploads", fileName);

    fs.writeFileSync(uploadPath, buffer);

    // ========================
    // SIMPAN DATA JSON
    // ========================
    const filePath = path.join(process.cwd(), "src/data/laporan.json");

    const existing = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    const newData = {
      id: Date.now(),
      nama,
      lokasi,
      deskripsi,
      foto: `/uploads/${fileName}`,
      status: "Menunggu"
    };

    existing.push(newData);

    fs.writeFileSync(filePath, JSON.stringify(existing, null, 2));

    return NextResponse.json({
      success: true,
      data: newData
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json({
      success: false,
      message: "Server error"
    }, { status: 500 });
  }
}