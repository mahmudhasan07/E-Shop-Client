import { Metadata } from "next";
import Auth from "./Auth";

export const metadata: Metadata = {
    title: 'Auth page',
    description: 'This is the login or registration page',
}

export default function Page() {
    return (
        <section>
            <Auth></Auth>
        </section>
    );
}