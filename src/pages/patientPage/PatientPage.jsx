import { useNavigate, useParams } from "react-router-dom";

import { Empty, Flex, Spin } from "antd";

import { DownOutlined, PhoneFilled } from "@ant-design/icons";
import { gender } from "../../enums";
import { useState } from "react";

import {
  useGetCoursesQuery,
  useGetDoseQuery,
  useGetDrugQuery,
  useGetFrequencyQuery,
  useGetMethodUseQuery,
  useGetPatientsQuery,
  useGetRecipeItemQuery,
  useGetRecipeQuery,
} from "../../store";

import styles from "./PatientPage.module.scss";
import clsx from "clsx";

import dayjs from "dayjs";
import "dayjs/locale/ru";

dayjs.locale("ru");

export const PatientPage = () => {
  const { codeid, prescription } = useParams();
  const navigate = useNavigate();

  const { data: patients, isLoading, isFetching } = useGetPatientsQuery();

  const { data: recipe } = useGetRecipeQuery();
  const { data: recipeItem } = useGetRecipeItemQuery();
  const { data: doses } = useGetDoseQuery();
  const { data: drugs } = useGetDrugQuery();
  const { data: frequency } = useGetFrequencyQuery();
  const { data: methodUse } = useGetMethodUseQuery();
  const { data: courses } = useGetCoursesQuery();

  const findPatient = patients?.find((item) => +item?.codeid === +codeid);

  console.log(findPatient, "findPatient");

  const findRecipeItem = recipeItem?.filter(
    (item) => +item.prescription_codeid === +prescription
  );

  const mappedRecipeWithNames = findRecipeItem?.map((item) => {
    const drug = drugs?.find((d) => d.codeid === +item.drug_codeid);
    const dose = doses?.find((d) => d.codeid === +item.dose_codeid);
    const method = methodUse?.find((m) => m.codeid === +item.method_use_codeid);
    const course = courses?.find((c) => c.codeid === +item.course_codeid);
    const freq = frequency?.find((f) => f.codeid === +item.frequency_codeid);

    return {
      ...item,
      drugName: drug?.nameid || "",
      doseName: dose?.nameid || "",
      methodName: method?.nameid || "",
      courseName: course?.count_days || "",
      frequencyName: freq?.times_per_day
        ? `${freq.times_per_day} раза в день по ${
            freq.quantity_per_time || 1
          } таблетке`
        : "",
    };
  });

  return (
    <Spin spinning={isLoading || isFetching}>
      <main className={clsx(styles.patient, "relative")}>
        <section className={clsx("container relative")}>
          <Flex vertical className={clsx(styles.patient_about)}>
            <Flex justify="space-between">
              <Flex vertical>
                <Flex gap="small" className={clsx(styles.patient_info)}>
                  <span className={clsx(styles.patient_info_fio)}>
                    {findPatient?.fio}
                  </span>
                  <span className={clsx(styles.patient_info_bday)}>
                    {dayjs(findPatient?.birth_date).format("D MMMM YYYY г.")}
                  </span>
                </Flex>
                <span className={clsx(styles.patient_info_gender)}>
                  <b>Пол:</b> {gender[findPatient?.gender]}
                </span>
              </Flex>

              {/* <span
                className={clsx(styles.act_btn)}
                onClick={() => setOpenUpdate(true)}
              >
                Редактировать
              </span> */}
            </Flex>
          </Flex>

          <Flex
            className={clsx(styles.patient_header, "container")}
            justify="space-between"
            align="center"
          >
            <span className={clsx(styles.title)}>Рецепт</span>
            {/* <span className={clsx(styles.act_btn)}>Изменить</span> */}
          </Flex>
        </section>

        <section className={clsx("container")}>
          <div className={clsx(styles.active_med)}>
            <Flex
              className={clsx(styles.active_med_title, "mb-2")}
              justify="space-between"
            >
              <span>Медицинская история</span>
              {/* <span className={clsx(styles.act_btn)}>Вытащить запись</span> */}
            </Flex>
          </div>
          {mappedRecipeWithNames?.length === 0 ? (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          ) : (
            <div className={clsx(styles.recipeCard)}>
              <table className={clsx(styles.recipeTable)}>
                <thead>
                  <tr>
                    <th>Лекарство</th>
                    <th>Доза</th>
                    <th>Прием</th>
                    <th>Курс</th>
                  </tr>
                </thead>
                <tbody>
                  {mappedRecipeWithNames?.map((med) => (
                    <tr key={med.codeid}>
                      <td>
                        <Flex vertical>
                          <span>{med.drugName}</span>
                          <span>({med.form_name})</span>
                        </Flex>
                      </td>
                      <td>{med.doseName}</td>
                      <td>
                        {med.time_before_food && "до еды "}
                        {med.time_during_food && "во время еды "}
                        {med.time_after_food && "после еды "}
                      </td>
                      <td>{med.courseName} д.</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className={clsx("container", styles.create_btn_wrap)}>
            <button
              className={clsx(styles.create_btn)}
              onClick={() => navigate("/")}
            >
              Выдать рецепт
            </button>
          </div>
        </section>
      </main>
    </Spin>
  );
};
