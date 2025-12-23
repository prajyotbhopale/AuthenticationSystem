export default async function UserProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params; // ✅ unwrap the promise

  console.log("PARAMS:", resolvedParams);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile Page</h1>
      <p className="text-4xl">
        Welcome to your profile!
        <span className="p-2 rounded bg-orange-500 text-black">
          {resolvedParams.id}
        </span>
      </p>
    </div>
  );
}
