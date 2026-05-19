import { Request, Response } from 'express';
import Lead from '../models/Lead';
import { AuthRequest } from '../middlewares/authMiddleware';

export const getLeads = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const pageSize = 10;
    const page = Number(req.query.page) || 1;

    const keyword = req.query.keyword
      ? {
          $or: [
            { name: { $regex: req.query.keyword as string, $options: 'i' } },
            { email: { $regex: req.query.keyword as string, $options: 'i' } },
          ],
        }
      : {};

    const statusFilter = req.query.status ? { status: req.query.status as string } : {};
    const sourceFilter = req.query.source ? { source: req.query.source as string } : {};

    const sortOrder = req.query.sort === 'oldest' ? 1 : -1;

    const query = { ...keyword, ...statusFilter, ...sourceFilter };

    const count = await Lead.countDocuments(query);
    const leads = await Lead.find(query)
      .sort({ createdAt: sortOrder })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({ leads, page, pages: Math.ceil(count / pageSize), total: count });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getLeadById = async (req: Request, res: Response): Promise<void> => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (lead) {
      res.json(lead);
    } else {
      res.status(404).json({ message: 'Lead not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createLead = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, email, status, source } = req.body;

    const lead = new Lead({
      name,
      email,
      status,
      source,
      createdBy: req.user?._id,
    });

    const createdLead = await lead.save();
    res.status(201).json(createdLead);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateLead = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, status, source } = req.body;

    const lead = await Lead.findById(req.params.id);

    if (lead) {
      lead.name = name || lead.name;
      lead.email = email || lead.email;
      lead.status = status || lead.status;
      lead.source = source || lead.source;

      const updatedLead = await lead.save();
      res.json(updatedLead);
    } else {
      res.status(404).json({ message: 'Lead not found' });
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteLead = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (lead) {
      await Lead.deleteOne({ _id: lead._id });
      res.json({ message: 'Lead removed' });
    } else {
      res.status(404).json({ message: 'Lead not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
