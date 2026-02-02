import { SignIn } from '@clerk/nextjs'

export default function Page() {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <SignIn
                appearance={{
                    elements: {
                        rootBox: "mx-auto",
                        card: "bg-gray-900 border border-gray-800",
                        headerTitle: "text-white",
                        headerSubtitle: "text-gray-400",
                        socialButtonsBlockButton: "bg-gray-800 border-gray-700 text-white hover:bg-gray-700",
                        formFieldLabel: "text-gray-300",
                        formFieldInput: "bg-gray-800 border-gray-700 text-white",
                        footerActionLink: "text-purple-500 hover:text-purple-400",
                        formButtonPrimary: "bg-purple-600 hover:bg-purple-700",
                    }
                }}
            />
        </div>
    )
}