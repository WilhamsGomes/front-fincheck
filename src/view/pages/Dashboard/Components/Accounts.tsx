import { EyeIcon } from "../../../components/icons/EyeIcon";
import AccountCard from "./AccountCard";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import AccountsSliderNavigation from "./AccountsSliderNavigation";

export default function Accounts() {
	return (
		<div className="bg-teal-900 rounded-2xl w-full h-full px-4 py-8 md:p-10 flex flex-col">
			<div>
				<span className="tracking-[-0.5px] text-white block">Saldo total</span>
				<div className="flex items-center gap-2">
					<strong className="text-2xl trancking-[-1px] text-white">
						R$ 1000,00
					</strong>
					<button className="w-8 h-8 flex items-center justify-center">
						<EyeIcon open />
					</button>
				</div>
			</div>

			<div className="flex-1 flex flex-col justify-end">
				<div>
					<Swiper spaceBetween={16} slidesPerView={2.2}>
						<div
							className="flex items-center justify-between mb-4"
							slot="container-start"
						>
							<strong className="text-white trancking-[-1px] text-18">
								Minhas contas
							</strong>

							<AccountsSliderNavigation />
						</div>

						<SwiperSlide>
							<AccountCard
								color="#7950F2"
								name="Nubank"
								balance={1000.23}
								type="CHECKING"
							/>
						</SwiperSlide>

						<SwiperSlide>
							<AccountCard
								color="#333"
								name="XP"
								balance={10432.23}
								type="INVESTMENT"
							/>
						</SwiperSlide>

						<SwiperSlide>
							<AccountCard
								color="#0f0"
								name="Carteira"
								balance={1432.23}
								type="CASH"
							/>
						</SwiperSlide>
					</Swiper>
				</div>
			</div>
		</div>
	);
}
