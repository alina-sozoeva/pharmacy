import {
  CaretDownOutlined,
  HomeFilled,
  LeftOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Dropdown, Flex, Space } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { pathname } from "../../enums";
import { useDispatch, useSelector } from "react-redux";
import { users } from "../../data";

import styles from "./Header.module.scss";
import clsx from "clsx";
import { removeUser } from "../../store";

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const path = location.pathname;
  const user = useSelector((state) => state.user.user);

  const logOut = () => {
    dispatch(removeUser());
  };

  const items = [
    {
      label: (
        <Space>
          <UserOutlined className={clsx("text-blue")} /> Admin
        </Space>
      ),
      key: "0",
    },

    {
      type: "divider",
    },
    {
      label: (
        <Space onClick={() => navigate("/login")}>
          <LogoutOutlined rotate={270} className={clsx("text-red")} /> Выйти
        </Space>
      ),
      key: "3",
    },
  ];

  return (
    <header className={clsx(styles.header)}>
      <section className={clsx(styles.header_content, "container")}>
        {path === pathname.home && (
          <Flex justify="space-between" align="center">
            <span onClick={() => navigate("/")}>
              <HomeFilled />
            </span>
            <Dropdown menu={{ items }} trigger={["click"]}>
              <div onClick={(e) => e.preventDefault()}>
                <Space>
                  <button className={clsx(styles.btn)}>
                    {user?.nameid.charAt(0)}
                  </button>
                  <Flex vertical gap={4}>
                    <p className={clsx(styles.user_info)}>{user?.login}</p>
                  </Flex>
                  <CaretDownOutlined />
                </Space>
              </div>
            </Dropdown>
          </Flex>
        )}
        {path === pathname.recipe && (
          <Flex justify="space-between" align="center">
            <span onClick={() => navigate("/")}>
              <HomeFilled />
            </span>
            <Dropdown menu={{ items }} trigger={["click"]}>
              <div onClick={(e) => e.preventDefault()}>
                <Space>
                  <button className={clsx(styles.btn)}>
                    {user?.nameid.charAt(0)}
                  </button>
                  <Flex vertical gap={4}>
                    <p className={clsx(styles.user_info)}>{user?.login}</p>
                  </Flex>
                  <CaretDownOutlined />
                </Space>
              </div>
            </Dropdown>
          </Flex>
        )}
        {path.startsWith("/patient/") && (
          <Flex justify="space-between" align="center">
            <LeftOutlined
              onClick={() => navigate(pathname.recipe)}
              style={{ width: "60px" }}
            />{" "}
            <Dropdown menu={{ items }} trigger={["click"]}>
              <div onClick={(e) => e.preventDefault()}>
                <Space>
                  <button className={clsx(styles.btn)}>
                    {user?.nameid.charAt(0)}
                  </button>
                  <Flex vertical gap={4}>
                    <p className={clsx(styles.user_info)}>{user?.login}</p>
                  </Flex>
                  <CaretDownOutlined />
                </Space>
              </div>
            </Dropdown>
          </Flex>
        )}
        {(path === pathname.prescriptions ||
          path === pathname.reports ||
          path === pathname.notifications ||
          path === pathname.diagnostics) && (
          <Flex justify="space-between" align="center">
            <div
              className={clsx(styles.prev_arr)}
              onClick={() => navigate("/")}
            >
              <LeftOutlined style={{ width: "80px" }} />{" "}
            </div>
            {path === pathname.prescriptions && <span>Выданные рецепты</span>}
            {path === pathname.reports && <span>Отчет за послений месяц</span>}
            {path === pathname.notifications && <span>Уведомления</span>}
            {path === pathname.diagnostics && <span>Диагностика</span>}

            <span></span>
            <Dropdown menu={{ items }} trigger={["click"]}>
              <div onClick={(e) => e.preventDefault()}>
                <Space>
                  <button className={clsx(styles.btn)}>
                    {user?.nameid?.charAt(0)}
                  </button>
                  <Flex vertical gap={4}>
                    <p className={clsx(styles.user_info)}>{user?.login}</p>
                  </Flex>
                  <CaretDownOutlined />
                </Space>
              </div>
            </Dropdown>
          </Flex>
        )}
      </section>
    </header>
  );
};
