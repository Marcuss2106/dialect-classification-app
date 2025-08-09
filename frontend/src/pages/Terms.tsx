const Terms = () => {
	return (
		<div className="text-left mx-auto max-w-prose pb-18 text-lg">
			<h1 className="text-2xl font-bold pt-36">AccentMe Terms of Use</h1>
			<p>Last Updated: [August 7, 2025]</p>
			<p>
				Welcome to AccentMe! By using our service, you agree to the
				following Terms of Use. If you do not agree, please do not use
				the service.
			</p>
			<ol className="list-decimal pl-6 space-y-4 mt-4 marker:font-bold">
				<li>
					<h2 className="text-xl font-semibold">About the Service</h2>
					<p>
						AccentMe allows users to upload short audio recordings
						of speech to receive dialect classification results. The
						service is experimental and may be updated, modified, or
						discontinued at any time.
					</p>
				</li>
				<li>
					<h2 className="text-xl font-semibold">
						User-Submitted Content
					</h2>
					<p>
						By uploading an audio recording, you confirm that:
						<ul className="list-disc pl-6">
							<li>
								You have the right to submit the recording
								(i.e., it is your voice or you have the
								speaker's consent).
							</li>
							<li>
								You grant AccentMe a non-exclusive, worldwide,
								royalty-free license to store, process, and use
								the recording for the purpose of improving
								machine learning models and conducting research.
							</li>
						</ul>
					</p>
				</li>
				<li>
					<h2 className="text-xl font-semibold">
						No Account Required
					</h2>
					<p>
						You are not required to create an account to use
						AccentMe. However, submitted recordings may be linked to
						technical metadata such as IP address or device/browser
						information.
					</p>
				</li>
				<li>
					<h2 className="text-xl font-semibold">Restrictions</h2>
					<p>
						You agree not to:
						<ul className="list-disc pl-6">
							<li>
								Upload audio that is obscene, threatening,
								illegal, or violates another’s rights.
							</li>
							<li>
								Use the service in a way that could harm,
								disable, or overload it.
							</li>
							<li>
								Attempt to reverse-engineer or interfere with
								the service.
							</li>
						</ul>
					</p>
				</li>
				<li>
					<h2 className="text-xl font-semibold">No Guarantees</h2>
					<p>
						AccentMe is provided “as is.” We do not guarantee the
						accuracy of dialect predictions or the availability of
						the service. Use at your own risk.
					</p>
				</li>
				<li>
					<h2 className="text-xl font-semibold">Changes to Terms</h2>
					<p>
						We may update these Terms of Use at any time. Continued
						use of AccentMe after changes are posted means you
						accept the new terms.
					</p>
				</li>
				<li>
					<h2 className="text-xl font-semibold">Contact</h2>
					<p>For questions or concerns, contact us at: placeholder</p>
				</li>
			</ol>
		</div>
	);
};

export default Terms;
