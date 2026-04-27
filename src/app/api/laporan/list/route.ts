import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "src/data/laporan.json");

    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    return NextResponse.json(data);

  } catch (error) {
    return NextResponse.json([]);
  }
}