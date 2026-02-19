"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { User } from "firebase/auth";

export interface CheckoutProfile {
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  street: string;
  houseNumber: string;
  postalCode: string;
  city: string;
  phone: string;
}

const emptyProfile: CheckoutProfile = {
  firstName: "",
  lastName: "",
  email: "",
  companyName: "",
  street: "",
  houseNumber: "",
  postalCode: "",
  city: "",
  phone: "",
};

function splitName(contactNaam: string): { firstName: string; lastName: string } {
  const trimmed = (contactNaam || "").trim();
  if (!trimmed) return { firstName: "", lastName: "" };
  const parts = trimmed.split(/\s+/);
  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(" "),
  };
}

function trim(val: unknown): string {
  return typeof val === "string" ? val.trim() : "";
}

export function useCheckoutProfile(user: User | null) {
  const [profile, setProfile] = useState<CheckoutProfile>(emptyProfile);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setProfile(emptyProfile);
      setLoading(false);
      return;
    }

    async function fetchProfile() {
      try {
        const uid = user!.uid;

        // Try businesses/{uid} first
        const bizSnap = await getDoc(doc(db, "businesses", uid));
        const biz = bizSnap.exists() ? bizSnap.data() : null;

        // Fallback: users/{uid}
        const userSnap = await getDoc(doc(db, "users", uid));
        const usr = userSnap.exists() ? userSnap.data() : null;
        const settings = usr?.settings || {};

        // Helper: pick first non-empty value
        const pick = (...sources: unknown[]) => {
          for (const s of sources) {
            const v = trim(s);
            if (v) return v;
          }
          return "";
        };

        // Name
        const rawName = pick(
          biz?.contactNaam,
          settings.contactNaam,
          usr?.contactNaam
        );
        const { firstName, lastName } = splitName(rawName);

        // Email
        const email = pick(
          biz?.email,
          settings.email,
          usr?.email,
          user!.email
        );

        // Company
        const companyName = pick(
          biz?.bedrijfsnaam,
          settings.bedrijfsnaam,
          usr?.bedrijfsnaam
        );

        // Address
        const bizAddr = biz?.bedrijfsgegevens || {};
        const usrAddr = usr?.bedrijfsgegevens || {};

        const street = pick(bizAddr.straat, usrAddr.straat, settings.adres);
        const houseNumber = pick(bizAddr.huisnummer, usrAddr.huisnummer, settings.huisnummer);
        const postalCode = pick(bizAddr.postcode, usrAddr.postcode, settings.postcode);
        const city = pick(bizAddr.plaats, usrAddr.plaats, settings.plaats);

        // Phone
        const phone = pick(biz?.telefoon, settings.telefoon, usr?.telefoon);

        setProfile({
          firstName,
          lastName,
          email,
          companyName,
          street,
          houseNumber,
          postalCode,
          city,
          phone,
        });
      } catch (err) {
        console.error("Failed to fetch checkout profile:", err);
        // Fall back to auth email
        setProfile({
          ...emptyProfile,
          email: user!.email || "",
        });
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [user]);

  return { profile, loading };
}
