"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { addCard, addPassword, fetchCards, fetchPasswords } from "@/lib/firebase";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@clerk/nextjs";
/* ------------------- ZOD SCHEMAS ------------------- */

const cardSchema = z.object({
    number: z
        .string()
        .regex(/^\d{4} \d{4} \d{4} \d{4}$/, "Card must be 16 digits"),
    expiry: z
        .string()
        .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid expiry date"),
    cvv: z.string().regex(/^\d{3,4}$/, "Invalid CVV"),
});

const passwordSchema = z.object({
    website: z.string().min(2, "Website is required"),
   
    password: z.string().min(6, "Password must be at least 6 characters"),
});

type CardFormData = z.infer<typeof cardSchema>;
type PasswordFormData = z.infer<typeof passwordSchema>;

export default function PasswordManager() {
    const { user } = useUser();
    const [showCardsSkeleton, setShowCardsSkeleton] = useState<boolean>(false)
    const [cards, setCards] = useState<any[]>([]);
    const [passwords, setPasswords] = useState<any[]>([]);
    const [showPasswordSkeleton, setShowPasswordSkeleton] = useState<boolean>(true)
    // const [cards, setCards] = useState<
    //     { number: string; expiry: string }[]
    // >([]);

    // const [passwords, setPasswords] = useState<
    //     { website: string; username: string }[]
    // >([]);

    /* ------------------- CARD FORM ------------------- */

    const {
        register: registerCard,
        handleSubmit: handleCardSubmit,
        formState: { errors: cardErrors, isSubmitting },
        setValue,
        reset


    } = useForm<CardFormData>({
        resolver: zodResolver(cardSchema),
    });

    const onAddCard = async (data: CardFormData) => {
        if (!user) return;

        const last4 = data.number.slice(-4);

        await addCard(user.id, {
            number: `**** **** **** ${last4}`,
            expiry: data.expiry,
        });

        const updatedCards = await fetchCards(user.id);
        setCards(updatedCards);
        reset();
    };
    /* ------------------- PASSWORD FORM ------------------- */

    const {
        register,
        handleSubmit,
        formState: { errors, isLoading ,isSubmitting:passDataAdding},
        reset: resetPass
    } = useForm<PasswordFormData>({
        resolver: zodResolver(passwordSchema),
    });

    const onAddPassword = async (data: PasswordFormData) => {
        if (!user) return;

        await addPassword(user.id, {
            website: data.website,
            password: data.password ?? "",
        });

        const updatedPasswords = await fetchPasswords(user.id);
        setPasswords(updatedPasswords);
        resetPass();
    };
    const formatCardNumber = (value: string) => {
        const cleaned = value.replace(/\D/g, ""); // remove non-digits
        const limited = cleaned.slice(0, 16); // max 16 digits

        const formatted = limited
            .match(/.{1,4}/g)
            ?.join(" ") || "";

        return formatted;
    };
    const formatExpiry = (value: string) => {
        const cleaned = value.replace(/\D/g, "").slice(0, 4);

        if (cleaned.length >= 3) {
            return cleaned.slice(0, 2) + "/" + cleaned.slice(2);
        }

        return cleaned;
    };
    const formatCVV = (value: string) => {
        return value.replace(/\D/g, "").slice(0, 4);
    };
    useEffect(() => {
        if (!user) return;

        const loadData = async () => {
            try {
                const cardsData = await fetchCards(user.id);
                const passwordData = await fetchPasswords(user.id);
                if (cardsData) setShowCardsSkeleton(true)
                console.log(cardsData, passwordData, "<<<<<<<<<<<<<<<<,,cards and password")
                if (passwordData) setShowPasswordSkeleton(false)
                setCards(cardsData as any);
                setPasswords(passwordData as any);
            } catch (error) {
                console.log(error)
                throw new Error("something went wrong with fetching firebase data")
            }
        };

        loadData();
    }, [user]);
    console.log(isLoading, "<<<<< is subiting")
    return (
        <div className="min-h-screen bg-black px-4 py-8 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-12">
                    Password Manager
                </h1>

                {/* TOP SECTION - Forms */}
                <div className="grid md:grid-cols-2  gap-6 lg:gap-10">

                    {/* ADD CARD */}
                    <form
                        onSubmit={handleCardSubmit(onAddCard)}
                        className="bg-gray-400 p-6 sm:p-8 rounded-xl shadow-lg"
                    >
                        <h2 className="text-xl font-semibold mb-6">
                            Add a Credit Card
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <input
                                    type="text"
                                    placeholder="1234 5678 9012 3456"
                                    {...registerCard("number")}
                                    onChange={(e) => {
                                        e.target.value = formatCardNumber(e.target.value);
                                    }}
                                    className="w-full border border-black text-pretty outline-none px-4 py-3 rounded-lg"
                                />
                                {cardErrors.number && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {cardErrors.number.message}
                                    </p>
                                )}
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        placeholder="MM/YY"
                                        {...registerCard("expiry")}
                                        maxLength={5}
                                        inputMode="numeric"
                                        onChange={(e) => {
                                            const formatted = formatExpiry(e.target.value);
                                            setValue("expiry", formatted);
                                        }}
                                        className="w-full border border-black text-pretty outline-none px-4 py-3 rounded-lg"
                                    />
                                    {cardErrors.expiry && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {cardErrors.expiry.message}
                                        </p>
                                    )}
                                </div>

                                <div className="flex-1">
                                    <input
                                        type="text"
                                        placeholder="CVV"
                                        maxLength={4}
                                        inputMode="numeric"
                                        {...registerCard("cvv")}
                                        onChange={(e) => {
                                            const formatted = formatCVV(e.target.value);
                                            setValue("cvv", formatted);
                                        }}
                                        className="w-full border border-black text-pretty outline-none px-4 py-3 rounded-lg"
                                    />
                                    {cardErrors.cvv && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {cardErrors.cvv.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full py-3 rounded-lg mt-2 text-white font-medium transition ${isSubmitting ? "bg-purple-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"}`}
                            >
                                {isSubmitting ? "Adding..." : "Add Card"}
                            </button>
                        </div>
                    </form>

                    {/* ADD PASSWORD */}
                    <form
                        onSubmit={handleSubmit(onAddPassword)}
                        className="bg-gray-400 p-6 sm:p-8 rounded-xl shadow-lg"
                    >
                        <h2 className="text-xl font-semibold mb-6">
                            Add a Password
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <input
                                    type="text"
                                    placeholder="example.com"
                                    {...register("website")}
                                    className="w-full border border-black text-pretty outline-none px-4 py-3 rounded-lg"
                                />
                                {errors.website && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.website.message}
                                    </p>
                                )}
                            </div>

                            

                            <div>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    {...register("password")}
                                    className="w-full border border-black text-pretty outline-none px-4 py-3 rounded-lg"
                                />
                                {errors.password && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={passDataAdding}
                                className={`w-full py-3 rounded-lg mt-2 text-white font-medium transition ${passDataAdding ? "bg-purple-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"}`}
                            >
                                {passDataAdding ? "Adding..." : "Add Password"}
                            </button>
                        </div>
                    </form>
                </div>

                {/* BOTTOM SECTION - Lists */}
                <div className="grid md:grid-cols-2 items-start gap-6 lg:gap-10 mt-10 lg:mt-14">

                    {/* CARDS LIST */}
                    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
                        <h2 className="text-xl text-black font-semibold mb-6">
                            Your Cards
                        </h2>

                        {!showCardsSkeleton ? (
                            <Skeleton className="h-24 w-full bg-gray-300 rounded-xl" />
                        ) : (
                                <div className="space-y-4 max-h-100 overflow-y-auto">
                                {cards.length > 0 ? (
                                    cards.map((card, index) => (
                                        <div
                                            key={index}
                                            className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-5 rounded-xl shadow-md"
                                        >
                                            <p className="text-xs uppercase tracking-wider text-purple-200 mb-3">Card Number</p>
                                            <p className="font-mono text-lg tracking-widest mb-4">{card.number}</p>
                                            <div className="flex justify-between items-end">
                                                <div>
                                                    <p className="text-xs uppercase tracking-wider text-purple-200">Expiry</p>
                                                    <p className="font-mono text-sm">{card.expiry}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500 text-center py-4">No cards saved yet</p>
                                )}
                            </div>
                        )}
                    </div>

                    {/* PASSWORD LIST */}
                    <div className="bg-white p-6 sm:p-8 text-black rounded-xl shadow-lg">
                        <h2 className="text-xl font-semibold mb-6">
                            Your Passwords
                        </h2>

                        {showPasswordSkeleton ? (
                            <Skeleton className="h-16 w-full bg-gray-300 rounded-lg" />
                        ) : (
                                <div className="space-y-3  max-h-100  overflow-y-auto">
                                {passwords.length > 0 ? (
                                    passwords.map((item, index) => (
                                        <div
                                            key={index}
                                            className="bg-gray-100 px-4 py-4 rounded-lg"
                                        >
                                            <p className="font-semibold">{item.website}</p>
                                            <p className="text-sm text-gray-600 mt-1">
                                                {item.username}
                                            </p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500 text-center py-4">No passwords saved yet</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
