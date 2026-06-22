import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Mydisa Foods" },
      {
        name: "description",
        content:
          "Read the Terms & Conditions for using the Mydisa Foods website, placing orders, and engaging with our millet products and services.",
      },
      { property: "og:title", content: "Terms & Conditions — Mydisa Foods" },
      {
        property: "og:description",
        content:
          "The terms governing your use of mydisa.com, orders, payments, delivery, and returns.",
      },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  const updated = "22 June 2026";
  return (
    <main className="bg-background">
      <section className="border-b border-border/60 bg-secondary/40">
        <div className="mx-auto max-w-3xl px-6 py-14">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Legal</p>
          <h1 className="font-display mt-3 text-4xl font-semibold text-foreground md:text-5xl">
            Terms & Conditions
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">Last updated: {updated}</p>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            Welcome to Mydisa Foods. By accessing or using our website, placing an
            order, or engaging our services, you agree to be bound by the terms
            below. Please read them carefully.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl space-y-10 px-6 py-14 text-foreground">
        <Block n="1" title="About us">
          <p>
            Mydisa Foods (“Mydisa”, “we”, “us”, “our”) sells millet-based food
            products and offers related services such as catering for parties,
            dealer partnerships, and training programmes. Our registered
            operating address is Plot 14, Agro Park, Bengaluru, Karnataka
            560100, India.
          </p>
        </Block>

        <Block n="2" title="Using this website">
          <p>
            You may browse this website for personal, non-commercial use. You
            agree not to misuse the site, attempt to gain unauthorised access,
            scrape content for resale, or interfere with its normal operation.
            Content, branding, photography, and copy on this site remain the
            property of Mydisa and may not be reproduced without written
            permission.
          </p>
        </Block>

        <Block n="3" title="Orders & pricing">
          <p>
            All orders placed through our forms are treated as a request to
            purchase. We confirm orders by phone, email, or WhatsApp before
            dispatch. Prices are listed in Indian Rupees (INR) and may change
            without notice. We reserve the right to refuse or cancel any order
            — for example if a product is out of stock, the address is outside
            our serviceable area, or pricing has been displayed incorrectly.
          </p>
        </Block>

        <Block n="4" title="Payments">
          <p>
            Accepted payment methods are listed at checkout or shared by our
            team when confirming your order. Payment must be received in full
            before dispatch unless we have agreed otherwise in writing (for
            dealers, bulk catering, or training bookings).
          </p>
        </Block>

        <Block n="5" title="Delivery">
          <p>
            We aim for same-week delivery within Bengaluru and pan-India
            shipping through trusted courier partners. Delivery timelines are
            estimates and may vary due to courier delays, weather, or
            unforeseen events. Risk in the goods passes to you on delivery.
          </p>
        </Block>

        <Block n="6" title="Returns & refunds">
          <p>
            Because our products are food items, returns are only accepted if
            the product is damaged in transit, has a manufacturing defect, or
            an incorrect item was shipped. Please contact us within 48 hours of
            delivery with photos of the issue. Approved refunds are issued to
            the original payment method within 7–10 working days.
          </p>
        </Block>

        <Block n="7" title="Catering, training & dealer services">
          <p>
            Party orders, training programmes, and dealer enquiries are subject
            to a separate confirmation, advance payment, and schedule that we
            share when responding to your form submission. Cancellation terms
            for these services are communicated at the time of booking.
          </p>
        </Block>

        <Block n="8" title="Reference codes & form submissions">
          <p>
            When you submit any form on this site (enquiry, order, dealer,
            backlink, suggestion, training, etc.) we generate a reference code
            so you can track your request. Please keep this code handy when
            contacting our team.
          </p>
        </Block>

        <Block n="9" title="Health information">
          <p>
            Information on our website about millets, recipes, and nutrition is
            for general educational purposes and is not medical advice. Please
            consult a qualified healthcare professional before making dietary
            changes, especially if you have allergies or medical conditions.
          </p>
        </Block>

        <Block n="10" title="Third-party links">
          <p>
            Our site may link to third-party websites, dealers, or services.
            Mydisa is not responsible for the content, practices, or accuracy
            of any external site.
          </p>
        </Block>

        <Block n="11" title="Limitation of liability">
          <p>
            To the maximum extent permitted by law, Mydisa is not liable for
            indirect, incidental, or consequential losses arising from your use
            of this site or our products. Our total liability for any claim
            relating to an order is limited to the amount you paid for that
            order.
          </p>
        </Block>

        <Block n="12" title="Changes to these terms">
          <p>
            We may update these Terms & Conditions from time to time. Updates
            will be posted on this page with a new “Last updated” date.
            Continued use of the site after changes constitutes acceptance of
            the revised terms.
          </p>
        </Block>

        <Block n="13" title="Governing law">
          <p>
            These terms are governed by the laws of India. Any disputes are
            subject to the exclusive jurisdiction of the courts at Bengaluru,
            Karnataka.
          </p>
        </Block>

        <Block n="14" title="Contact us">
          <p>
            Questions about these terms? Reach us at{" "}
            <a className="underline underline-offset-4" href="mailto:hello@mydisa.com">
              hello@mydisa.com
            </a>{" "}
            or{" "}
            <a className="underline underline-offset-4" href="tel:+919884539288">
              +91 98845 39288
            </a>
            , or visit our{" "}
            <Link to="/contact" className="underline underline-offset-4">
              contact page
            </Link>
            .
          </p>
        </Block>
      </section>
    </main>
  );
}

function Block({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-xl font-semibold text-foreground md:text-2xl">
        <span className="mr-3 text-muted-foreground">{n}.</span>
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground md:text-base">
        {children}
      </div>
    </section>
  );
}
