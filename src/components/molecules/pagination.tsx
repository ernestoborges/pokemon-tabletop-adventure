import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";
import SelectField from "./field-select";

export default function Pagination({
  page,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}: {
  page: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}) {
  const buttonClass =
    "w-7 h-7 text-2xl flex items-center justify-center rounded-md bg-card shadow-sm ";

  function getDisabledClass(isDisabled: boolean) {
    return isDisabled
      ? "opacity-50"
      : "cursor-pointer hover:bg-background-hover";
  }

  return (
    <div className="w-fullflex flex-col items-center gap-2">
      <div className="w-full mt-2 flex gap-2 items-center justify-center">
        <button
          className={`${buttonClass} ${getDisabledClass(page === 1)}`}
          onClick={() => onPageChange(1)}
          disabled={page === 1}
        >
          <MdOutlineKeyboardDoubleArrowLeft />
        </button>
        <button
          className={`${buttonClass} ${getDisabledClass(page === 1)}`}
          onClick={() => onPageChange(Math.max(page - 1, 1))}
          disabled={page === 1}
        >
          <MdOutlineKeyboardArrowLeft />
        </button>
        <div className="mx-4 flex gap-2 items-center flex-nowrap whitespace-nowrap">
          <SelectField
            options={Array.from({ length: totalPages }, (_, i) => ({
              value: `${i + 1}`,
              label: `${i + 1}`,
            }))}
            value={`${page}`}
            onChange={(value) => onPageChange(Number(value))}
          />
          <span>of</span>
          <span>{totalPages}</span>
        </div>
        <button
          className={`${buttonClass} ${getDisabledClass(page === totalPages)}`}
          onClick={() => onPageChange(Math.min(page + 1, totalPages))}
          disabled={page === totalPages}
        >
          <MdOutlineKeyboardArrowRight />
        </button>
        <button
          className={`${buttonClass} ${getDisabledClass(page === totalPages)}`}
          onClick={() => onPageChange(totalPages)}
          disabled={page === totalPages}
        >
          <MdOutlineKeyboardDoubleArrowRight />
        </button>
      </div>
      <div className="flex gap-3 items-center justify-between text-sm">
        <div className="flex gap-2 items-center flex-nowrap whitespace-nowrap">
          {(page - 1) * itemsPerPage + 1}-
          {Math.min(page * itemsPerPage, totalItems)} of {totalItems}
        </div>
        <div className="flex gap-2 items-center flex-nowrap whitespace-nowrap">
          Result per page:
          <SelectField
            options={Array.from({ length: 10 }, (_, i) => ({
              value: `${(i + 1) * 10}`,
              label: `${(i + 1) * 10}`,
            }))}
            value={`${itemsPerPage}`}
            onChange={(value) => onItemsPerPageChange(Number(value))}
          />
        </div>
      </div>
    </div>
  );
}
