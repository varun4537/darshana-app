"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface BillingContextType {
    isPremium: boolean;
    isLoading: boolean;
    upgradeToPremium: () => Promise<void>;
    manageSubscription: () => Promise<void>;
}

const BillingContext = createContext<BillingContextType | undefined>(undefined);

export function BillingProvider({ children }: { children: React.ReactNode }) {
    const [isPremium, setIsPremium] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Hydrate from local storage for demo purposes
        const storedPremium = localStorage.getItem('darshana_is_premium');
        if (storedPremium) {
            setIsPremium(JSON.parse(storedPremium));
        }
        setIsLoading(false);
    }, []);

    const upgradeToPremium = async () => {
        // Stub for Stripe integration
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
        setIsPremium(true);
        localStorage.setItem('darshana_is_premium', 'true');
        setIsLoading(false);
    };

    const manageSubscription = async () => {
        // Stub for portal redirect
        console.log("Redirecting to billing portal...");
        await new Promise(resolve => setTimeout(resolve, 500));
        // In reality: window.location.href = billingPortalUrl;
        alert("Billing Portal Stub: You are currently on the " + (isPremium ? "Premium" : "Free") + " plan.");
    };

    return (
        <BillingContext.Provider value={{ isPremium, isLoading, upgradeToPremium, manageSubscription }}>
            {children}
        </BillingContext.Provider>
    );
}

export const useBilling = () => {
    const context = useContext(BillingContext);
    if (!context) {
        throw new Error('useBilling must be used within a BillingProvider');
    }
    return context;
};
