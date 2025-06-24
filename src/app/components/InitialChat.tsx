import MainInput, { MainInputProps } from "./MainInput";

type InitialChatProps = MainInputProps & {};

export function InitialChat({
  value,
  onChange,
  onSubmit,
  isLoading,
}: InitialChatProps) {
  return (
    <div className="flex flex-col gap-5">
      <h1
        className="
      font-semibold text-2xl sm:text-3xl 
      md:text-4xl leading-tight text-center text-[#121217]"
      >
        Need somenthing for voding? Ask me!
      </h1>
      <div className="h-40">
        <MainInput
          value={value}
          onChange={onChange}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
