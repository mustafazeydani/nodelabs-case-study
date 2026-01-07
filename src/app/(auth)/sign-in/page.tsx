import { SignInForm } from './_components/sign-in-form';

export { metadata } from './_utils/metadata';

const SignInPage = () => {
  return (
    <div className="flex grow flex-col justify-center">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-semibold">Sign In</h1>
        <p className="text-muted-foreground">
          Welcome back! Please enter your details
        </p>
      </div>

      <SignInForm />
    </div>
  );
};

export default SignInPage;
