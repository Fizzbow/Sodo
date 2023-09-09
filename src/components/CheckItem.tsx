export interface ItemProps {
  text: string;
  caption: string;
  checked?: boolean;
}

const CheckItem = ({ text, caption, checked = false }: ItemProps) => {
  return (
    <li my-1 p-2 rounded-1 bg-green-backdrop>
      <div flex="~ col">
        <span text-greyness-deep>{text}</span>
        <span text-greyness-tint>{caption}</span>
      </div>
    </li>
  );
};

export default CheckItem;
