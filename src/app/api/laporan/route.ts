import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseServer";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const nama = formData.get("nama") as string;
    const lokasi = formData.get("lokasi") as string;
    const deskripsi = formData.get("deskripsi") as string;
    const foto = formData.get("foto") as File;

    if (!nama || !lokasi || !deskripsi || !foto) {
      return NextResponse.json(
        {
          success: false,
          message: "Data tidak lengkap",
        },
        { status: 400 }
      );
    }

    // ========================
    // UPLOAD KE SUPABASE
    // ========================
    const bytes = await foto.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const safeName = foto.name.replace(/\s+/g, "-");
    const fileName = `${Date.now()}-${safeName}`;
    const filePath = `laporan/${fileName}`;

    const { error: uploadError } = await supabaseAdmin.storage
      .from("uploads")
      .upload(filePath, buffer, {
        contentType: foto.type || "image/jpeg",
      });

    if (uploadError) {
      return NextResponse.json(
        {
          success: false,
          message: "Gagal upload foto",
          error: uploadError.message,
        },
        { status: 500 }
      );
    }

    // ========================
    // AMBIL URL FOTO
    // ========================
    const { data: publicUrlData } = supabaseAdmin.storage
      .from("uploads")
      .getPublicUrl(filePath);

    const fotoUrl = publicUrlData.publicUrl;

    // ========================
    // SIMPAN KE DATABASE
    // ========================
    const { data, error } = await supabaseAdmin
      .from("laporan")
      .insert({
        nama,
        lokasi,
        deskripsi,
        foto: fotoUrl,
        status: "Menunggu",
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        {
          success: false,
          message: "Gagal menyimpan data",
          error: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Server error",
      },
      { status: 500 }
    );
  }
}
