import WelcomeMessage from "@/components/srv";
import ClientLogger from "@/components/client";
export default function Home() {

  return (
   <div>
     <WelcomeMessage />
     <ClientLogger />
    <h1>{process.env.NEXT_PUBLIC_ANALYTICS_ID}</h1>
   </div>

  );
}
