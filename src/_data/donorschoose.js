import Fetch from "@11ty/eleventy-fetch";

export default async function () {
    let url = "https://api.donorschoose.org/common/json_school.html?APIKey=H9v7hCeN&school=90738&Index=0";

    let json = await Fetch(url, {
        duration: "4d",
        type: "json",
    });

    console.log("✅ Data fetched:", json.proposals?.length || 0, "proposals");

    const result = {
        proposals: json.proposals || [],
        totalProposals: json.totalProposals || 0
    };

    return result
};