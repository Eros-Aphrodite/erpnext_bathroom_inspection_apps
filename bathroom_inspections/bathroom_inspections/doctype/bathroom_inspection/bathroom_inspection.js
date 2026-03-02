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

			// Show every tab header (Demolition, Plumbing, Electrical, etc.).
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

