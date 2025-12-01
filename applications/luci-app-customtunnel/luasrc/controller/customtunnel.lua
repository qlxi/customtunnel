
module("luci.controller.customtunnel", package.seeall)

function index()
    entry({"admin", "services", "customtunnel"}, cbi("customtunnel"), _("Custom Tunnel"), 60).dependent = true
end
