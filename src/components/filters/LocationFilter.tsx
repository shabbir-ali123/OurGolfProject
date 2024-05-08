
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GroupBase, OptionsOrGroups } from 'react-select';
import Select from "react-select";

interface OptionType {
    label: string;
    value: string;
  }
  type GroupedOptionType = GroupBase<OptionType>;

export default function LocationFilter({handleLocationChange}: any) {
    const { t, i18n } = useTranslation();

    const JapanCities: GroupedOptionType[] = [
        {
          label: t('HOKKAIDO_TOHOKU'),
          options: [
            { value: "Hokkaido", label: t('HOKKAIDO') },
            { value: "Aomori Prefecture", label: t('AOMORI') },
            { value: "Iwate Prefecture", label: t('IWATE') },
            { value: "Miyagi Prefecture", label: t('MIYAGI') },
            { value: "Akita", label: t('AKITA') },
            { value: "Yamagata Prefecture", label: t('YAMAGATA') },
            { value: "Fukushima Prefecture", label: t('FUKUSHIMA') },
           
          ],
        },
        {
          label: t('KANTO'),
          options: [
            { value: "Ibaraki Prefecture", label: t('IBARAKI') },
            { value: "Tochigi Prefecture", label: t('TOCHIGI') },
            { value: "Gunma Prefecture", label: t('GUNMA') },
            { value: "Saitama", label: t('SAITAMA') },
            { value: "Chiba prefecture", label: t('CHIBA') },
            { value: "Tokyo", label: t('TOKYO') },
            { value: "Kanagawa Prefecture", label: t('KANAGAWA') },
          ],
        },
        {
          label: t('CHUBU'),
          options: [
            { value: "Niigata Prefecture", label: t('NIIGATA') },
            { value: "Toyama Prefecture", label: t('TOYAMA') },
            { value: "Ishikawa Prefecture", label: t('ISHIKAWA') },
            { value: "Fukui prefecture", label: t('FUKUI') },
            { value: "Yamanashi Prefecture", label: t('YAMANSHI') },
            { value: "Nagano", label: t('NAGANO') },
          ],
        },
        {
          label: t('TOKAI'),
          options: [
            { value: "Shizuoka Prefecture", label: t('SHIZUOKA') },
            { value: "Aichi prefecture", label: t('AICHI') },
            { value: "Mie Prefecture", label: t('MIE') },
            { value: "Gifu Prefecture", label: t('GIFU') },
          ],
        },
        {
          label: t('KINKI'),
          options: [
            { value: "Shiga Prefecture", label: t('SHIGA') },
            { value: "Kyoto", label: t('KYOTO') },
            { value: "Osaka prefecture", label: t('OSAKA') },
            { value: "Hyogo prefecture", label: t('HYOGO') },
            { value: "Nara Prefecture", label: t('NARA') },
            { value: "Wakayama Prefecture", label: t('WAKAYAMA') },
    
          ],
        },
        {
          label: t('SHIKOKU'),
          options: [
            { value: "Tottori prefecture", label: t('TOTTORI') },
            { value: "Shimane Prefecture", label: t('SHIMANE') },
            { value: "Okayama Prefecture", label: t('OKAYAMA') },
            { value: "Hiroshima", label: t('HIROSHIMA') },
            { value: "Yamaguchi Prefecture", label: t('YAMAGUCHI') },
            { value: "Tokushima", label: t('TOKUSHIMA') },
            { value: "Kagawa Prefecture", label: t('KAGAWA') },
            { value: "Ehime Prefecture", label: t('EHIME') },
            { value: "Kochi Prefecture", label: t('KOCHI') },
          ],
        },
        {
          label: t('KYUSHU'),
          options: [
            { value: "Fukuoka Prefecture", label: t('FUKUOKA') },
            { value: "Saga Prefecture", label: t('SAGA') },
            { value: "Nagasaki Prefecture", label: t('NAGASAKI') },
            { value: "Kumamoto Prefecture", label: t('KUMAMOTO') },
            { value: "Oita Prefecture", label: t('OITA') },
            { value: "Miyazaki prefecture", label: t('MIYAZAKI') },
            { value: "Kagoshima prefecture", label: t('KAGOSHIMA') },
            { value: "Okinawa Prefecture", label: t('OKINAWA') },
          ],
        },
    
      ];


      const handleChange = (selectedOption: OptionType | null) => {
        handleLocationChange(selectedOption?.value);
      };

    return (
        <div className="relative text-start w-full col-span-8 mt-8 lg:col-span-4 md:col-span-5 md:mr-0 md:mb-2">
              <label
                className="block mb-2 text-lg tracking-wide text-[#626262] captilize"
                htmlFor="place"
              >
                {t("PLACE")}
              </label>
              <Select
                name="place"
                options={
                  JapanCities as OptionsOrGroups<
                    OptionType,
                    GroupBase<OptionType>
                  >
                }
                onChange={handleChange}
                className="w-full text-base border border-gray-300 rounded shadow hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              
            </div>
    )
}
