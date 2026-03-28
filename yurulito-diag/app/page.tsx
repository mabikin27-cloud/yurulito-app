import { DiagnosisForm } from "@/components/diagnosis/diagnosis-form";

export default function Home() {
  return (
    <div className="from-yurulito-cream via-background to-yurulito-blush/40 flex min-h-full flex-1 flex-col bg-gradient-to-b">
      <main className="flex flex-1 flex-col">
        <DiagnosisForm />
      </main>
    </div>
  );
}
