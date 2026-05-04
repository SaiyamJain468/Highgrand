"use client"

import { useTransition } from "react"
import { deleteCategory } from "./actions"

export default function DeleteButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this category? Products inside this category may break if they are not reassigned.")) {
      startTransition(async () => {
        await deleteCategory(id)
      })
    }
  }

  return (
    <button 
      onClick={handleDelete}
      disabled={isPending}
      className="text-brand-muted hover:text-red-500 font-inter text-[12px] underline underline-offset-2 disabled:opacity-50"
    >
      {isPending ? "Deleting..." : "Delete"}
    </button>
  )
}
