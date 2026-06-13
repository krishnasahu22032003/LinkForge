import Button from "@/components/ui/Button";
export default function Home() {


  return (
<div>
<Button variant="primary" size="lg">Forge link →</Button>
<Button variant="secondary">Get started</Button>
<Button variant="ghost" size="sm">Cancel</Button>
<Button variant="outline">Sign in</Button>
<Button variant="danger">Delete link</Button>
<Button variant="primary" loading>Saving</Button>
</div>
  );
}