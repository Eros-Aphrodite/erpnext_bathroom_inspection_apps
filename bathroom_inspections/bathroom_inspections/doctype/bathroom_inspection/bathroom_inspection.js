// Copyright (c) 2026, qfinishes and contributors
// For license information, please see license.txt

frappe.ui.form.on("Bathroom Inspection", {
	refresh(frm) {
		// Keep all Bathroom Inspection tabs visible, even when some
		// tabs don't yet contain any visible fields.

		// Run after Frappe's own layout / tab refresh.
		setTimeout(() => {
			const $wrapper = $(frm.wrapper);
			const $tabs_list = $wrapper.find(".form-tabs-list");

			if (!$tabs_list.length) return;

			// First, remove any auto-inserted "default" tab.
			// 1) Prefer removing the special "__details" tab if present.
			// 2) If not present, and the first tab is "Demolition" followed by "Details",
			//    drop that first "Demolition" tab so "Details" becomes the first tab.
			let removed_any = false;

			const $autoDetails = $tabs_list
				.find('.nav-link[data-fieldname="__details"]')
				.closest(".nav-item");
			if ($autoDetails.length) {
				const targetId = $autoDetails.find(".nav-link").attr("href");
				$autoDetails.remove();
				if (targetId) {
					$wrapper.find(targetId).remove();
				}
				removed_any = true;
			}

			if (!removed_any) {
				const $navItems = $tabs_list.find(".nav-item");
				if ($navItems.length >= 2) {
					const $first = $navItems.eq(0);
					const $second = $navItems.eq(1);
					const firstText = $first.text().trim();
					const secondText = $second.text().trim();

					if (firstText === "Demolition" && secondText === "Details") {
						const targetId = $first.find(".nav-link").attr("href");
						$first.remove();
						if (targetId) {
							$wrapper.find(targetId).remove();
						}
					}
				}
			}

			// Show every tab header (Details, Demolition, Plumbing, Electrical, etc.).
			$tabs_list.find(".nav-item").each((_, el) => {
				const $item = $(el);
				$item.removeClass("hide").addClass("show");
			});

			// Ensure each tab pane itself is not force-hidden.
			$wrapper.find(".form-tab-content .tab-pane").each((_, el) => {
				const $pane = $(el);
				$pane.removeClass("hide");
			});

			// Make sure at least one tab is active.
			const $active_link = $tabs_list.find(".nav-link.active");
			if (!$active_link.length) {
				const $first = $tabs_list.find(".nav-link").first();
				if ($first.length) {
					$first.tab("show");
				}
			}
		}, 0);
	},
});

