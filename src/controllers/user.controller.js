import {asyncHandler} from "../utils/asyncHandler.js"
import { ASTTree,evaluateAST,combineASTs } from "../utils/ASTTree.js";
import { Rule } from "../models/rule.model.js";
import {APIError} from "../utils/APIError.js"
import {APIResponse} from "../utils/APIResponse.js"

const createRule = asyncHandler(async (req,res) => {
    const {ruleString} = req.body;
    
    if(!ruleString)
        throw new APIError(404,"Invalid Rule provided")

    const astTree = new ASTTree(ruleString)

    const rule = await Rule.create({
        rule:ruleString,
        ast:astTree.root
    }) 

    if(!rule)
        throw new APIError(400,"Something went wrong while creating the rule.")
    
    return res.
    redirect('back')

    //when using front-end

    /*.status(201).
    json(new APIResponse(200,rule,"Rule created successfully"))*/
})

const evaluateRule = asyncHandler(async (req,res) => {
    const {ruleId,data} = req.body

    if(!ruleId)
        throw new APIError(401,"Invalid Rule ID provided")

    const rule = await Rule.findById(ruleId)

    if(!rule)
        throw new APIError(404,"Rule does not exist")
       
    const result = evaluateAST(rule.ast,data)

    const redirectUrl = `/api/v1/users/?result=${encodeURIComponent(result)}`;

    return res.
    redirect(redirectUrl)
    //when using frontend-

    /*status(201).
    json(new APIResponse(200,{"rule":rule.rule,"result":result,"params":data},"Rule successfully evaluated"))*/
})

const combineRules = asyncHandler(async (req,res) => {
    const ruleIds = req.body.rules
    if(!ruleIds)
        throw new APIError(404,"Rules does not exist")
    const ruleList = []
    let name = ""

    for(const [idx,ruleId] of ruleIds.entries()){
        const rule = await Rule.findById(ruleId)
        name += rule.rule
        if(idx < ruleIds.length-1)
            name += " + "
        ruleList.push(rule.ast)
    }
    
    while(ruleList.length > 1){
        const rule1 = ruleList.pop()
        const rule2 = ruleList.pop()
        
        ruleList.push(combineASTs(rule1,rule2))
    }

    const result = ruleList.pop();
    const combinedRule = await Rule.create({
        rule:name,
        ast:result
    })

    return res.
    redirect("back")

    //when using frontend-
    /*.status(201).
    json(new APIResponse(200,combinedRule,"Rules combined successfully."))*/
})

const resetRules = asyncHandler(async (req,res) => {
    await Rule.deleteMany({});
    return res.
    redirect("back")

    //for front end
    /*.status(201).
    json(new APIResponse(200,{},"Reset Successfull"))*/
})

const getRuleList = async () => {
    const ruleList = await Rule.find({})
    
    return ruleList;
}
export {createRule,evaluateRule,combineRules,getRuleList,resetRules}