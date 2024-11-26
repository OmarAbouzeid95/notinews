import Section from "@/components/common/Section";
import Link from "next/link";
import { getUser } from "@/lib/userUtils";
import { redirect } from "next/navigation";
import UpdateCategories from "@/components/profile/UpdateCategories";

const ProfilePage = async ({ params }: { params: { id: string } }) => {
  const { id }: { id: string } = params;
  if (!id || id === "") {
    redirect("/");
  }
  const { foundUser: user, error } = await getUser(id);
  if (error || !user) {
    return (
      <Section title="" subHeading="" className="mt-16">
        <h1 className="font-semibold text-2xl mb-4 text-center">
          Oops, looks like this user doesn&apos;t exist
        </h1>
        <h2 className="text-lg text-center">
          Please signup on the{" "}
          <Link href="/" className="underline">
            home page
          </Link>
        </h2>
      </Section>
    );
  }

  return (
    <Section title=" ">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-semibold mb-12">
          Welcome back, {user.name.split(" ")[0]}
        </h1>
        <UpdateCategories userCategories={user.categories} />
      </div>
    </Section>
  );
};

export default ProfilePage;
