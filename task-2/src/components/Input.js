export default function Input({ type, onChange, placeholder,defaultValue,required }) {
  return (
    <input
      type={type}
      onChange={onChange}
      placeholder={placeholder}
      defaultValue={defaultValue}
      required={required}
    />
  );
}
