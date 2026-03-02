// Ensure Bathroom Inspection has a proper desk route even if it's missing
// from frappe.boot.user.can_read (e.g. due to permissions config).

(function () {
	if (!window.frappe || !frappe.router) return;

	function ensure_bathroom_inspection_route() {
		if (!frappe.router.routes) return;

		if (!frappe.router.routes["bathroom-inspection"]) {
			frappe.router.routes["bathroom-inspection"] = {
				doctype: "Bathroom Inspection",
			};
		}
	}

	// Run after router.setup initializes routes
	const original_setup = frappe.router.setup;
	frappe.router.setup = function () {
		original_setup.apply(this, arguments);
		ensure_bathroom_inspection_route();
	};

	// Also run once in case routes are already present
	if (frappe.router.routes) {
		ensure_bathroom_inspection_route();
	}
})();

