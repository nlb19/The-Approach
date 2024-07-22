
type FormWrapperProps = {
    children: React.ReactNode;
    error: string | null;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};
export const FormWrapper = ({ children, error, handleSubmit }: FormWrapperProps) => {
    return (
        <form className={"font-new-science font-bold max-w-screen-md lg:w-1/2 m-auto p-8 flex flex-col gap-4 rounded-xl bg-light-gray dark:bg-dark-charcoal mt-2" + (error && " border-2 border-error")} onSubmit={handleSubmit}>
            { children }
        </form>
    )
};