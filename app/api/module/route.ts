import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { MODULE_CONFIG } from "@/lib/config";

// GET - Read operations
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get("action");

    switch (action) {
      case "list":
        const { data: items, error } = await supabaseAdmin
          .from(`${MODULE_CONFIG.slug}_items`)
          .select("*")
          .order("created_at", { ascending: false })
          .limit(50);

        if (error) throw error;
        return NextResponse.json({ items });

      default:
        return NextResponse.json({
          module: MODULE_CONFIG.name,
          version: "1.0.0",
          endpoints: {
            "GET ?action=list": "List all items",
            "POST action=create": "Create new item",
          },
        });
    }
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST - Write operations
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, ...data } = body;

    switch (action) {
      case "create":
        const { user_id, title, description } = data;
        
        if (!title) {
          return NextResponse.json({ error: "Title required" }, { status: 400 });
        }

        const { data: item, error } = await supabaseAdmin
          .from(`${MODULE_CONFIG.slug}_items`)
          .insert({
            user_id,
            title,
            description,
            status: "draft",
          })
          .select()
          .single();

        if (error) throw error;
        return NextResponse.json({ success: true, item });

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

