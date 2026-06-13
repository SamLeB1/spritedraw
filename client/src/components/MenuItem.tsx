type MenuItemProps = {
  item: string;
  onClick: () => void;
  shortcut?: string;
  disabled?: boolean;
};

export default function MenuItem({
  item,
  onClick,
  shortcut,
  disabled = false,
}: MenuItemProps) {
  if (disabled) {
    if (shortcut) {
      return (
        <button
          className="flex w-full items-center justify-between px-3 py-1 text-sm text-zinc-400"
          type="button"
          disabled
        >
          <span className="mr-8">{item}</span>
          <span>{shortcut}</span>
        </button>
      );
    } else {
      return (
        <button
          className="block w-full px-3 py-1 text-start text-sm text-zinc-400"
          type="button"
          disabled
        >
          {item}
        </button>
      );
    }
  } else {
    if (shortcut) {
      return (
        <button
          className="flex w-full cursor-pointer items-center justify-between px-3 py-1 text-sm hover:bg-zinc-500"
          type="button"
          onClick={onClick}
        >
          <span className="mr-8">{item}</span>
          <span>{shortcut}</span>
        </button>
      );
    } else {
      return (
        <button
          className="block w-full cursor-pointer px-3 py-1 text-start text-sm hover:bg-zinc-500"
          type="button"
          onClick={onClick}
        >
          {item}
        </button>
      );
    }
  }
}
