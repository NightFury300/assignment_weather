import { Router } from "express";
import { createRule,evaluateRule,combineRules,getRuleList,resetRules } from "../controllers/user.controller.js";
const router = Router()

router.route("/").get(async (req,res) => {
    const result = req.query.result
    const list = await getRuleList()
    
    return res.render('index',{data:{ruleList:list,result}})
})

router.route("/create-rule").post(createRule)
router.route("/evaluate-rule").post(evaluateRule)
router.route("/combine-rules").post(combineRules)
router.route("/reset-rules").get(resetRules)

export default router;