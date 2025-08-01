import { auth, db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

interface Transaction {
  userId: string;
  date: Date;
  amount: number;
  category: string;
  description: string;
  type: string;
}

export async function GET(req: NextRequest) {
  try {
    const userId = req.headers.get("Authorization");

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const transactionsCollectionRef = collection(db, "transactions");
    const q = query(
      transactionsCollectionRef,
      where("userId", "==", userId),
      orderBy("date", "desc")
    );

    const querySnapshot = await getDocs(q);
    const transactions: any[] = [];

    querySnapshot.forEach((doc) => {
      transactions.push({ id: doc.id, ...doc.data() });
    });

    return NextResponse.json(transactions, { status: 200 });
  } catch (error: any) {
    console.error("Error getting transactions:", error);
    return NextResponse.json(
      { message: "Failed to get transactions" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const userId = req.headers.get("Authorization");

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const requestBody: Transaction = await req.json();
    const { date, amount, category, description, type } = requestBody;

    const transactionsCollectionRef = collection(db, "transactions");
    const newTransaction = await addDoc(transactionsCollectionRef, {
      userId: userId,
      date: date,
      amount: amount,
      category: category,
      description: description,
      type: type,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json(
      { message: "Transaction created", id: newTransaction.id },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating transaction:", error);
    return NextResponse.json(
      { message: "Failed to create transaction" },
      { status: 500 }
    );
  }
}
