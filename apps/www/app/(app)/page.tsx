import Image from "next/image"
import Link from "next/link"

import { Announcement } from "@/components/announcement"
import { CardsDemo } from "@/components/cards"
import { ExamplesNav } from "@/components/examples-nav"
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { Button } from "@/registry/new-york/ui/button"

export default function IndexPage() {
  return (
    <>
      <PageHeader>
        {/* <Announcement /> */}
        <PageHeaderHeading>
          Extend your <u>shadcn/ui</u> component library
        </PageHeaderHeading>
        <PageHeaderDescription>
          Extend your <u>shadcn/ui</u> that is beautifully designed components
          that you can copy and paste into your apps. Made with Tailwind CSS.
          Open source.
        </PageHeaderDescription>
        <PageActions>
          <Button asChild size="sm">
            <Link href="/docs">Get Started</Link>
          </Button>
          {/* <Button asChild size="sm" variant="ghost">
            <Link href="/blocks">Browse Blocks</Link>
          </Button> */}
        </PageActions>
      </PageHeader>
      {/* <div className="border-grid border-b">
        <div className="container-wrapper">
          <div className="container py-4">
            <ExamplesNav className="[&>a:first-child]:text-primary" />
          </div>
        </div>
      </div> */}
      <div className="container-wrapper">
        <div className="container py-6">
          <p>
            <strong>!IMPORTANT:</strong> If you do not use{" "}
            <a
              className="font-semibold underline"
              href="https://ui.shadcn.com/"
              target="_blank"
            >
              shadcn/ui
            </a>{" "}
            in your project, this is NOT suit for you.{" "}
          </p>
          <p>
            Please visit{" "}
            <a
              className="font-semibold underline"
              href="https://ui.shadcn.com/"
              target="_blank"
            >
              shadcn/ui
            </a>{" "}
            and start to use.
          </p>
          {/* <section className="overflow-hidden rounded-lg border bg-background shadow-md md:hidden md:shadow-xl">
            <Image
              src="/examples/cards-light.png"
              width={1280}
              height={1214}
              alt="Cards"
              className="block dark:hidden"
            />
            <Image
              src="/examples/cards-dark.png"
              width={1280}
              height={1214}
              alt="Cards"
              className="hidden dark:block"
            />
          </section>
          <section className="hidden md:block [&>div]:p-0">
            <CardsDemo />
          </section> */}
        </div>
      </div>
    </>
  )
}
