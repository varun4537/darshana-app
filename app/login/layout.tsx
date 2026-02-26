import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sign In",
    description: "Sign in to save your study progress and access premium features on Darshana.",
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return children;
}
