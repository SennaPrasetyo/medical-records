import "./custom-filter.css";
import { Input, InputGroup } from "@chakra-ui/react";
import { Search } from "lucide-react";

export type CustomFilterProps = {
  value: string;
  onChange: (value: string) => void;
  onSearch?: () => void;
  placeholder?: string;
  inputId?: string;
  searchButtonTestId?: string;
};

const CustomFilter = ({
  value,
  onChange,
  onSearch,
  placeholder = "Cari nama karyawan atau NIK",
  inputId = "inptSearchEmployee",
  searchButtonTestId = "btnSearchEmployee",
}: CustomFilterProps) => {
  const runSearch = () => {
    onSearch?.();
  };

  return (
    <InputGroup
      className="custom-filter"
      endAddonProps={{
        unstyled: true,
        className: "custom-filter__addon-shell",
      }}
      endAddon={
        <button
          type="button"
          id="btnSearchEmployee"
          data-testid={searchButtonTestId}
          className="custom-filter__search-btn"
          aria-label="Cari"
          onClick={runSearch}
        >
          <Search aria-hidden strokeWidth={2} />
        </button>
      }
    >
      <Input
        id={inputId}
        className="custom-filter__input"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            runSearch();
          }
        }}
        autoComplete="off"
      />
    </InputGroup>
  );
};

export default CustomFilter;
