import { NextResponse } from "next/server";

const EXPRESS_API_BASE_URL = "https://blockserver-1.onrender.com"; // Change if deployed

export async function GET(req, { params }) {
    try {
        const { action } = params;
        const url = new URL(req.url);
        const args = url.searchParams.get("args");

        const response = await fetch(`${EXPRESS_API_BASE_URL}/read/${action}?args=${args}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function POST(req, { params }) {
    try {
        const { action } = params;
        const body = await req.json();

        const response = await fetch(`${EXPRESS_API_BASE_URL}/write/${action}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
