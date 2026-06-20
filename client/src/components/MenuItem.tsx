import { MdCheck } from "react-icons/md";

type MenuItemProps = {
  item: string;
  onClick: () => void;
  shortcut?: string;
  checked?: boolean;
  disabled?: boolean;
};

export default function MenuItem({
  item,
  onClick,
  shortcut,
  checked = false,
  disabled = false,
}: MenuItemProps) {
  if (disabled) {
    if (shortcut) {
      if (checked) {
        return (
          <button
            className="flex w-full items-center justify-between py-1 pr-4 text-sm text-zinc-400"
            type="button"
            disabled
          >
            <div className="mr-8 flex items-center">
              <MdCheck
                className="mx-1"
                size="16"
                color="oklch(70.5% 0.015 286.067)"
              />
              <span>{item}</span>
            </div>
            <span>{shortcut}</span>
          </button>
        );
      } else {
        return (
          <button
            className="flex w-full items-center justify-between py-1 pr-4 pl-6 text-sm text-zinc-400"
            type="button"
            disabled
          >
            <span className="mr-8">{item}</span>
            <span>{shortcut}</span>
          </button>
        );
      }
    } else {
      if (checked) {
        return (
          <button
            className="flex w-full items-center py-1 pr-4 text-start text-sm text-zinc-400"
            type="button"
            disabled
          >
            <MdCheck
              className="mx-1"
              size="16"
              color="oklch(70.5% 0.015 286.067)"
            />
            <span>{item}</span>
          </button>
        );
      } else {
        return (
          <button
            className="block w-full py-1 pr-4 pl-6 text-start text-sm text-zinc-400"
            type="button"
            disabled
          >
            {item}
          </button>
        );
      }
    }
  } else {
    if (shortcut) {
      if (checked) {
        return (
          <button
            className="flex w-full cursor-pointer items-center justify-between py-1 pr-4 text-sm hover:bg-zinc-500"
            type="button"
            onClick={onClick}
          >
            <div className="mr-8 flex items-center">
              <MdCheck className="mx-1" size="16" color="white" />
              <span>{item}</span>
            </div>
            <span>{shortcut}</span>
          </button>
        );
      } else {
        return (
          <button
            className="flex w-full cursor-pointer items-center justify-between py-1 pr-4 pl-6 text-sm hover:bg-zinc-500"
            type="button"
            onClick={onClick}
          >
            <span className="mr-8">{item}</span>
            <span>{shortcut}</span>
          </button>
        );
      }
    } else {
      if (checked) {
        return (
          <button
            className="flex w-full cursor-pointer items-center py-1 pr-4 text-start text-sm hover:bg-zinc-500"
            type="button"
            onClick={onClick}
          >
            <MdCheck className="mx-1" size="16" color="white" />
            <span>{item}</span>
          </button>
        );
      } else {
        return (
          <button
            className="block w-full cursor-pointer py-1 pr-4 pl-6 text-start text-sm hover:bg-zinc-500"
            type="button"
            onClick={onClick}
          >
            {item}
          </button>
        );
      }
    }
  }
}
