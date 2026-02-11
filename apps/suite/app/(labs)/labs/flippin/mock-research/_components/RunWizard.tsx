"use client";
import { useActionState } from "react";

interface ActionState {
  ok: boolean;
  message?: string;
}

export function RunWizard({ runId }: { runId: string }) {
  const [state, action, isPending] = useActionState<ActionState, FormData>(
    async (_prevState, formData) => {
      "use server";
      const observation = formData.get("observation") as string;
      // Save logic here
      return { ok: true, message: `Saved: ${observation}` };
    },
    { ok: false }
  );

  return (
    <div className="p-6 bg-black/50 rounded-xl border border-zinc-700">
      <form action={action} className="space-y-4">
        <input 
          name="observation" 
          placeholder="Research observation..." 
          className="w-full p-4 bg-zinc-900 border border-zinc-600 rounded-xl text-white placeholder-zinc-500 focus:border-emerald-400 focus:outline-none" 
        />
        <button 
          type="submit" 
          disabled={isPending}
          className="w-full px-6 py-3 bg-emerald-500/80 hover:bg-emerald-400 text-black font-bold rounded-xl disabled:opacity-50 transition-all"
        >
          {isPending ? "Saving..." : "Save Observation"}
        </button>
        {state.message && (
          <p className={`text-sm ${state.ok ? 'text-emerald-400' : 'text-red-400'}`}>
            {state.message}
          </p>
        )}
      </form>
    </div>
  );
}