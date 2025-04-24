"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@spheroid/ui"

const LandingPage = () => (
  <div className="h-fit w-full">
    <main className="container mx-auto px-8 pb-32 pt-16">
      <div className="mb-8 flex justify-center">
        <div className="rounded-full border border-gray-200 bg-white/80 px-4 py-1 text-sm">Eth bangkok →</div>
      </div>
      <div className="mx-auto mb-12 max-w-4xl text-center">
        <h1 className="mb-3 text-4xl font-bold md:mb-6 md:text-6xl">Payment 3.0</h1>
        <h2 className="mb-3 text-3xl font-bold md:mb-6 md:text-4xl">Bring your web2 users to web3!</h2>
        <p className="mb-8 text-xl text-gray-600">
          One of the finest decentralized payment protocol to onboard web2 users to web3 on the planet.
        </p>
        <div className="flex justify-center space-x-4">
          <Button
            variant={"primary"}
            onClick={() => (window.location.href = "/demo")}
            className="rounded-md bg-black px-3 py-2 text-white"
          >
            Merchant
          </Button>
          <Button
            onClick={() => (window.location.href = "/sigin")}
            variant={"secondary"}
            className="rounded-md border-2 border-black bg-white px-4 py-2 text-black"
          >
            User
          </Button>
        </div>
      </div>
      <div className="relative mx-auto max-w-5xl">
        <div className="absolute left-0 top-1/2 w-1/4 md:top-1/4 md:w-1/4">
          <Image
            src={"/images/mobile.jpg"}
            alt="Mobile app"
            width={300}
            height={600}
            className="rounded-lg shadow-2xl md:rounded-3xl"
          />
        </div>
        <div className="ml-[15%] mr-[15%] w-[300px] md:w-[800px]">
          <Image
            src={"/images/desktop.jpg"}
            alt="Desktop app"
            width={800}
            height={500}
            className="rounded-xl shadow-2xl"
          />
        </div>
        <div className="absolute -top-1/4 right-0 w-1/2 md:top-1/4 md:w-1/3">
          <Image
            src={"/images/tab.jpg"}
            alt="Tablet app"
            width={400}
            height={300}
            className="roundmd:rounded-xl shadow-2xl"
          />
        </div>
      </div>
    </main>
  </div>
)

export default LandingPage
