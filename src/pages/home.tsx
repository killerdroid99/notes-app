import { useSession, signIn } from "next-auth/react";
import Navbar from "../components/Navbar";

function SignUp() {
	const { data: session } = useSession();

	return (
		<div className="h-screen bg-primary text-white grid place-items-center relative">
			<Navbar />
			<div>
				<h3>Sign Up with Discord</h3>
				{session ? (
					<p>You are seeing this because you are logged in 👌</p>
				) : (
					<p>You are not logged in 😢</p>
				)}
			</div>
		</div>
	);
}

export default SignUp;
