import { notFound } from "next/navigation";
import { EventTemplate } from "@/components/events/EventTemplate";
import { events } from "@/config/events";

export default async function EventPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const event = events.find(e => e.slug === slug);

    if (!event) {
        notFound();
    }

    return <EventTemplate event={event} />;
}
