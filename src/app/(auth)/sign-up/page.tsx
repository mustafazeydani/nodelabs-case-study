import { SignUpForm } from './_components/sign-up-form';

export { metadata } from './_utils/metadata';

const SignUpPage = () => {
  return (
    <div className="flex grow flex-col justify-center">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-semibold">Sign Up</h1>
        <p className="text-muted-foreground">
          Welcome back! Please enter your details
        </p>
      </div>

      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
