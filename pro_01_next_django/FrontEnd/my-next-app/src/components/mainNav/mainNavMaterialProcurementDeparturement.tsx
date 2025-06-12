"use client"

import Link from "next/link"
import LogoutButton from "@/components/LogoutButton"

const menuItems = [
	{
		label: "Home",
		href: "/home",
	},
	{
		label: "Vật Tư",
		submenu: [
			{ label: "Danh mục vật tư", href: "/vat-tu/danh-muc" },
			{
				label: "Kho",
				submenu: [
					{ label: "Nhập kho", href: "/vat-tu/kho/nhap-kho" },
					{ label: "Xuất kho", href: "/vat-tu/kho/xuat-kho" },
					{ label: "Kiểm kê", href: "/vat-tu/kho/kiem-ke" },
				],
			},
			{ label: "Báo cáo", href: "/vat-tu/bao-cao" },
		],
	},
	{
		label: "My Notes",
		submenu: [
			{
				label: "Django",
				submenu: [
					{ label: "Docker 01", href: "/html/django/start_dijango_with_docker_step_01.html" },
					{ label: "Docker 02", href: "/html/django/start_dijango_with_docker_step_02.html" },
					{ label: "Docker 03", href: "/html/django/start_dijango_with_docker_step_03.html" },
					{ label: "Docker 04", href: "/html/django/start_dijango_with_docker_step_04.html" },
				],
			},
			{
				label: "nextjs",
				submenu: [
					{ label: "flow-redux-toolkit", href: "/html/nextjs/flow-redux-toolkit.html" },
					{ label: "next-link-to-html-static", href: "/html/nextjs/next-link-to-html-static.html" },
					{ label: "react-hooks", href: "/html/nextjs/react-hooks.html" },
					{ label: "react-redux", href: "/html/nextjs/react-redux.html" },
					{ label: "redux-toolkit", href: "/html/nextjs/redux-toolkit.html" },
					{ label: "useState-useReducer", href: "/html/nextjs/useState-useReducer.html" },
				],
			},
			{
				label: "economic",
				submenu: [
					{ label: "Lãi suất Việt Nam", href: "/html/economic/eco-interest_rates_full.html" },
				],
			},
			{
				label: "orther-projects",
				submenu: [
					{ label: "base", href: "/html/orther-projects/base.html" },
					{ label: "danh_muc_san_pham", href: "/html/orther-projects/danh_muc_san_pham.html" },
					{ label: "home", href: "/html/orther-projects/home.html" },
					{ label: "index", href: "/html/orther-projects/index.html" },
					{ label: "login", href: "/html/orther-projects/login.html" },
					{ label: "mychart", href: "/html/orther-projects/mychart.html" },
					{ label: "ngay_quan_trong", href: "/html/orther-projects/ngay_quan_trong.html" },
					{ label: "postGreSQL-config-remote-connecttion", href: "/html/orther-projects/postGreSQL-config-remote-connecttion.html" },
					{ label: "user", href: "/html/orther-projects/user.html" },
				],
			},
		],
	},
	{
		label: "Đơn hàng bán",
		href: "#",
	},
	{
		label: "Đơn hàng mua",
		href: "#",
	},
	{
		label: "Tiện ích",
		href: "#",
	},
	{
		label: "Admin",
		href: "/admin/user",
	},
]

export function MainNav({ className }: { className?: string }) {
	return (
		<nav className={`navbar navbar-expand ${className}`}>
			<div style={{display: 'flex', width: '100%', alignItems: 'center'}}>
				<ul className="navbar-nav" style={{flex: 1}}>
					{menuItems.map((item, index) => (
						<li key={index} className={item.submenu ? "nav-item dropdown" : "nav-item"}>
							{item.submenu ? (
								<>
									<a
										className="nav-link dropdown-toggle"
										href="#"
										role="button"
										data-bs-toggle="dropdown"
										aria-expanded="false"
									>
										{item.label}
									</a>
									<ul className="dropdown-menu">
										{item.submenu.map((subItem, subIndex) => (
											<li key={subIndex}>
												{subItem.submenu ? (
													<div className="dropdown-submenu">
														<a className="dropdown-item" href="#">
															{subItem.label}
														</a>
														<ul className="dropdown-menu">
															{subItem.submenu.map((subSubItem, subSubIndex) => (
																<li key={subSubIndex}>
																	<Link className="dropdown-item" href={subSubItem.href}>
																		{subSubItem.label}
																	</Link>
																</li>
															))}
														</ul>
													</div>
												) : (
													<Link className="dropdown-item" href={subItem.href || "#"}>
														{subItem.label}
													</Link>
												)}
											</li>
										))}
									</ul>
								</>
							) : (
								<Link className="nav-link" href={item.href}>
									{item.label}
								</Link>
							)}
						</li>
					))}
				</ul>
				<LogoutButton />
			</div>
		</nav>
	)
}
