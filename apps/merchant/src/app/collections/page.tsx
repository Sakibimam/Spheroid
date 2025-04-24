"use client"

import React, { useState } from "react"
import Link from "next/link"
import { AiOutlinePlus } from "react-icons/ai"
import { CiImport } from "react-icons/ci"
import { FaPeopleGroup, FaTicket } from "react-icons/fa6"
import { Button } from "@spheroid/ui"

import Modal from "@/components/ui/Modal"

const CollectionPage = () => {
  const [createModal, setCreateModal] = useState(false)
  return (
    <div className="flex h-full w-full flex-col items-start gap-5 p-6">
      <Modal
        isOpen={createModal}
        onClose={() => setCreateModal(false)}
        title="Create Collection(s)"
      >
        <div className="flex w-full flex-col gap-2">
          <Link
            href="/collections/product"
            className="flex flex-row items-center gap-2 rounded-lg p-4 hover:bg-slate-200"
          >
            <div className="rounded-full bg-black bg-opacity-10 p-2">
              <FaPeopleGroup />
            </div>
            <span className="text-base font-semibold">Product</span>
          </Link>
          <Link
            href="/collections/services"
            className="flex flex-row items-center gap-2 rounded-lg p-4 hover:bg-slate-200"
          >
            <div className="rounded-full bg-black bg-opacity-10 p-2">
              <FaTicket />
            </div>
            <span className="text-base font-semibold">Services</span>
          </Link>
        </div>
      </Modal>
      <div className="w-full items-center justify-between">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-xl font-semibold">Collections</h2>
          <div className="flex flex-row items-center gap-3">
            <Button
              onClick={() => setCreateModal(true)}
              variant="primary"
              className="flex flex-row items-center gap-2 px-4 text-white"
            >
              <AiOutlinePlus size={20} />
              <span>Create</span>
            </Button>
            <Button
              onClick={() => (window.location.href = "/collections/import")}
              variant="outline"
              className="flex flex-row items-center gap-2 px-4"
            >
              <CiImport
                style={{ color: "#2563eb" }}
                size={20}
              />
              <span>Import</span>
            </Button>
          </div>
        </div>
      </div>
      <div className=""></div>
    </div>
  )
}

export default CollectionPage
